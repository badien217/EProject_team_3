import { Component, ViewChild } from '@angular/core';
import { faStar, faStarHalfStroke, faArrowRight, faCartShopping, faBellConcierge, faCircleCheck, faAngleRight, faAngleLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { Book } from 'src/app/interfaces/book';
import { Flavor } from 'src/app/interfaces/flavor';
import { Product } from 'src/app/interfaces/product';
import { Recipe } from 'src/app/interfaces/recipe';
import { BookService } from 'src/app/services/book.service';
import { ProductService } from 'src/app/services/product.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { SwiperOptions } from 'swiper/types';
import { CartDetail } from 'src/app/interfaces/cart-detail';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/interfaces/cart';
import { UserRecipeService } from 'src/app/services/user-recipe.service';
import { UserRecipe } from 'src/app/interfaces/user-recipe';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  faStar = faStar;
  faStarHalfStroke = faStarHalfStroke;
  faArrowRight = faArrowRight;
  faCartShopping = faCartShopping;
  faBellConcierge = faBellConcierge;
  faStarRegular = faStarRegular;
  faCircleCheck = faCircleCheck;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  faQuoteRight = faQuoteRight;

  backgroundImages: string[] = [
    'assets/images/bg-hero-pistachio.png',
    'assets/images/bg-hero-strawberry.png',
    'assets/images/bg-hero-banana.png',
    'assets/images/bg-hero-chocolate.png',
    'assets/images/bg-hero-melon.png',
    'assets/images/bg-hero-peach.png',
    'assets/images/bg-hero-mango.png',
    'assets/images/bg-hero-rasberry.png',
  ];

  days: number = 1;
  hours: number = 1;
  minutes: number = 1;
  seconds: number = 1;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  iceCreams: Product[] = [];
  flavors: Flavor[] = [];
  books: Book[] = [];
  recipes: Recipe[] = [];
  cartItems: CartDetail[] = [];
  userRecipes: UserRecipe[] = [];
  user: User;


  get isClientLoggedIn(): boolean {
    return this.authService.isClientLoggedIn();
  }


  @ViewChild('swiperFlavor', { static: false }) swiperFlavor?: HomeComponent;
  slidesPerViewFlavor: number = 5;

  @ViewChild('swiperProduct', { static: false }) swiperProduct?: HomeComponent;
  slidesPerViewProduct: number = 4;

  constructor(
    private productService: ProductService,
    private bookService: BookService,
    private recipeService: RecipeService,
    private sessionStorageService: SessionStorageService,
    private authService: AuthenticationService,
    private cartService: CartService,
    private userRecipeService: UserRecipeService,
    private userService: UserService,
    private messageService: MessageService
  ) {
    this.user = <any>{};
  }


  ngOnInit() {
    setInterval(() => {
      // Decrease seconds
      this.seconds--;

      // Update minutes, hours, and days accordingly
      if (this.seconds < 0) {
        this.seconds = 59;
        this.minutes--;

        if (this.minutes < 0) {
          this.minutes = 59;
          this.hours--;

          if (this.hours < 0) {
            this.hours = 23;
            this.days--;

            // Optionally, you can add logic to handle when days reach 0
            // For simplicity, this example doesn't include that logic
          }
        }
      }
    }, 1000);

    this.productService.getAllProducts().pipe(takeUntil(this.destroy$)).subscribe(
      (data: Product[]) => {
        this.iceCreams = data;
      }
    );

    this.productService.getAllFlavors().pipe(takeUntil(this.destroy$)).subscribe(
      (data: Flavor[]) => {
        this.flavors = data;
      }
    );

    this.bookService.getAllBooks().pipe(takeUntil(this.destroy$)).subscribe(
      (data: Book[]) => {
        this.books = data.slice(0, 4);
        this.fetchAverageRatings();
      }
    );

    this.recipeService.getAllShowRecipes().pipe(takeUntil(this.destroy$)).subscribe(
      (data: Recipe[]) => {
        this.recipes = data.slice(0, 3);
      }
    );

    this.userRecipeService.getListParticipateUserRecipes().pipe(takeUntil(this.destroy$)).subscribe(
      (data: UserRecipe[]) => {
        // Iterate through each user recipe
        data.forEach(userRecipe => {
          // Fetch username for the user using userId
          this.userService.getUserById(userRecipe.userId).pipe(takeUntil(this.destroy$)).subscribe(
            (userInfo) => {
              // Once you get the user info, assign the username to the userRecipe object
              userRecipe.name = userInfo.name;
            },
            error => {
              this.messageService.openError('User recipes data retrieval error');
            }
          );
        });
        // Assign the fetched user recipes to the component property
        this.userRecipes = data;
      }
    );

    this.updateSlidesPerView();
    window.addEventListener('resize', this.updateSlidesPerView.bind(this));

  }

  fetchAverageRatings() {
    this.books.forEach(book => {
      this.bookService.getAvgRating(book.id).subscribe(
        (avgRating: number) => {
          book.averageRating = avgRating;
        },
        error => {
          this.messageService.openError('Book ratings data retrieval error')
        }
      );
    });
  }


  addToCart(book: Book): void {
    if (this.isClientLoggedIn) {
      const token = localStorage.getItem('isClientLoggedIn');
      if (token) {
        this.authService.getUserInfo(token).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            this.cartService.getLatestCartByUserId(data.userInfo.id).subscribe(
              (cart: Cart) => {
                if (cart) {
                  const existingDetail = cart.cartDetails.find(detail => detail.bookId === book.id);
                  if (existingDetail) {
                    existingDetail.quantity += 1;
                    this.cartService.updateCartDetail(existingDetail.id, existingDetail).subscribe(
                      () => {
                        this.cartService.updateCartDetailTotal(cart.cartDetails.length);
                      },
                      (error) => {
                        this.messageService.openError('Fail to add book to cart')
                      }
                    );
                  } else {
                    const newCartDetail: CartDetail = {
                      id: 0, // Since it's a new detail, let the server generate the ID
                      cartId: cart.id,
                      bookId: book.id!,
                      quantity: 1,
                    };
                    this.cartService.createCartDetail(newCartDetail).subscribe(
                      () => {
                        this.cartService.updateCartDetailTotal(cart.cartDetails.length + 1);
                      },
                      (error) => {
                        this.messageService.openError('Fail to add book to cart')
                      }
                    );
                  }
                } else {
                  this.messageService.openError('Fail to add book to cart')
                }
              },
              error => {
                this.messageService.openError('Cart data retrieval error')
              }
            );
          }
        );
      }
    } else {
      // handle add book store session storage

      // Handle add book to session storage as CartDetail
      const storedCartDetailsJson = sessionStorage.getItem('cartDetails');
      let storedCartDetails: CartDetail[] = storedCartDetailsJson ? JSON.parse(storedCartDetailsJson) : [];

      const existingDetailIndex = storedCartDetails.findIndex(detail => detail.bookId === book.id);

      if (existingDetailIndex !== -1) {
        // Detail is already in session storage, update quantity
        storedCartDetails[existingDetailIndex].quantity += 1;
      } else {
        // Detail is not in session storage, add it
        const newCartDetail: CartDetail = {
          id: 0, // Since it's a new detail, let the server generate the ID
          cartId: 0, // Set to 0 or another default value as it's not associated with a cart yet
          bookId: book.id!,
          quantity: 1,
        };
        storedCartDetails.push(newCartDetail);
      }

      // Save updated details back to session storage
      // sessionStorage.setItem('cartDetails', JSON.stringify(storedCartDetails));
      this.sessionStorageService.set('cartDetails', storedCartDetails);
    }
  }

  updateSlidesPerView(): void {
    // Adjust the number of slides-per-view based on screen size
    if (window.innerWidth >= 1200) {
      this.slidesPerViewFlavor = 5;
    } else if (window.innerWidth >= 992) {
      this.slidesPerViewFlavor = 4;
    } else if (window.innerWidth >= 768) {
      this.slidesPerViewFlavor = 4;
    } else if (window.innerWidth >= 576) {
      this.slidesPerViewFlavor = 4;
    } else if (window.innerWidth >= 465) {
      this.slidesPerViewFlavor = 4;
    } else {
      this.slidesPerViewFlavor = 3;
    }
  }


  getAvgStarArray(avgRating: number): any[] {
    const avgStarArray = [];
    const fullStars = Math.floor(avgRating);
    const halfStar = avgRating - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        avgStarArray.push({ icon: this.faStar });
      } else if (i === fullStars && halfStar) {
        avgStarArray.push({ icon: this.faStarHalfStroke });
      } else {
        avgStarArray.push({ icon: this.faStarRegular });
      }
    }
    return avgStarArray;
  }

  // Function to check if a book is new (published within the last month)
  isNew(publishedDate: Date): boolean {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // Subtract one month
    const bookDate = new Date(publishedDate);
    return bookDate >= oneMonthAgo;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    window.removeEventListener('resize', this.updateSlidesPerView.bind(this));

  }
}

