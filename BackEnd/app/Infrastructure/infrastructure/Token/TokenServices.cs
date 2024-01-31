using Application.Interfaces.Token;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;



namespace infrastructure.Token
{
    public class TokenServices : ITokenServices
    {
        private readonly UserManager<User> userManager;
        private readonly TokenSetting tokenSettings;
        public TokenServices(IOptions<TokenSetting> options, UserManager<User> userManager) { 
            tokenSettings = options.Value;
            this.userManager = userManager;
        }

        //tạo Json Web Token bằng các sử dụng User và role
        public async Task<JwtSecurityToken> CreateToken(User user, IList<string> roles)
        {
            //tạo 1 claim để chứ thông tin Jti(Id token),NameIdentifier(Id người dùng),Email(email người dùng)
            var claim = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
            };
            //cho claim vào vòng lặp dựa trên danh sách role cung cấp
            foreach(var role in roles)
            {
                claim.Add(new Claim(ClaimTypes.Role,role));

            }
            //tạo khóa Key từ khóa bí mật  SymmetricSecurityKey trong đó chuỗi byte được mã hóa từ tokenSettings.Secret
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenSettings.Secret));
            //tạo đối tượng JWTSecurityToken với các thông số issuer(nhà phát hành) audience(đối tượng đại diện) 
            //expires(thời gian phiên bản), claims (danh sách claim) và SigningCredentials(thông tin chứng thực)
            //với SecurityAlgorithms.HmacSha256 là thuật toán mã hóa hash bằng các sử dụng key với key là trên
            //Sử dụng thuật toán mã hóa HmacSha256 để ký chứng thực cho JWT, giúp đảm bảo tính toàn vẹn của token
            var token = new JwtSecurityToken(
               issuer: tokenSettings.Issuer,
               audience: tokenSettings.Audience,
               expires: DateTime.Now.AddMinutes(tokenSettings.TokenValidityInMunitues),
               claims: claim,
               signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
               );
            //thêm  claim vào người dùng
            await userManager.AddClaimsAsync(user, claim);
            //trả về token với có thể được sử dụng để xác thực và ủy quyền trong ứng dụng
            return token;

        }
        //tạo 1 hàm generateRefreshRoken trả về 1 chuỗi string
        public string GenerateRefreshToken()
        {
            //tạo biến randomNumber với 64 byte
            var randomNumber = new byte[64];
            //sử dụng RandomNumberGenerator để chọn các số ngẫu nhiên đển đổ vào mảng
            using var rng = RandomNumberGenerator.Create();

            rng.GetBytes(randomNumber);
            //chả về chuỗi base 64 và trả về giá trị
            return Convert.ToBase64String(randomNumber);
        }
        // tạo phương thức GetPrincipalFromExpiredToken với dữ liệu trả về là ClaimsPrincipal hoặc có thể null
        //lưu ý sở dĩ trả về dữ liệu kia là do ClaimsPrincipal đại diện cho các danh sách claim(quyền lợi ,thông tin người dùng)
        public ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token)
        {
            //cấu hình quy tắc xác thực cho việc xác nhận token
            TokenValidationParameters tokenValidationParamaters = new()
            {
                ValidateIssuer = false,//vô hiệu hóa kiểm tra người phát hành
                ValidateAudience = false,//vô hiệu hóa kiểm tra người nhận
                ValidateIssuerSigningKey = true,// kiểm tra khóa ký chứng thực của Issuer
                //để xác thực chứng thực 
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenSettings.Secret)),
                ValidateLifetime = false//vô hiệu hóa phiên làm việc
            };
            //tạo 1 đối tượng JwtSecurityTokenHandler để xử lý token
            JwtSecurityTokenHandler tokenHandler = new();
            //kiểm trả và xác nhận token nếu đúng thì xác nhận nếu không thì vứt ra 1 SecurityTokenException
            var principal = tokenHandler.ValidateToken(token, tokenValidationParamaters, out SecurityToken securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken
                || !jwtSecurityToken.Header.Alg
                .Equals(SecurityAlgorithms.HmacSha256,
                StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("token không tìm thấy");

            return principal;

        }
    }
}
