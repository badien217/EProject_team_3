import { Component, ViewChild } from '@angular/core';
import { faStar, faStarHalfStroke, faArrowRight, faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../../interfaces/product';
import { Flavor } from '../../../interfaces/flavor';
import { Book } from '../../../interfaces/book';
import { Recipe } from '../../../interfaces/recipe';
import { ProductService } from '../../../services/product.service';
import { BookService } from '../../../services/book.service';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  faStar = faStar;
  faStarHalfStroke = faStarHalfStroke;
  faArrowRight = faArrowRight;
  faCartShopping = faCartShopping;
  faHeart=faHeart;
  testImages: Array<string>;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  iceCreams: Product[] = [];
  flavors: Flavor[] = [];
  books: Book[] = [];
  recipes : Recipe[]=[];

  @ViewChild('swiper', { static: false }) swiper?: HomeComponent;
  slidesPerView: number = 5;

  constructor(private productService: ProductService, private bookService: BookService,    private recipeService: RecipeService) {
    this.testImages = [
      "../../../assets/images/ice-cream-about-1.png",
      "../../../assets/images/ice-cream-about-2.jpg",
      "../../../assets/images/ice-cream-about-3.jpg",
      "../../../assets/images/ice-cream-recipe-1.jpg",
      "../../../assets/images/ice-cream-recipe-2.jpg",
    ]
  }


  ngOnInit() {
    this.productService.getAllProducts().pipe(takeUntil(this.destroy$)).subscribe(
      (data: Product[]) => {
        this.iceCreams = data.slice(0, 8);
        console.log(this.iceCreams);
      }
    );

    this.productService.getAllFlavors().pipe(takeUntil(this.destroy$)).subscribe(
      (data: Flavor[]) => {
        this.flavors = data;
        console.log(this.flavors);
      }
    );

    this.bookService.getAllBooks().pipe(takeUntil(this.destroy$)).subscribe(
      (data: Book[]) => {
        this.books = data.slice(0, 8);
        console.log(this.books);
      }
    );

    this.recipeService.getAllRecipes().pipe(takeUntil(this.destroy$)).subscribe(
      (data: Recipe[]) => {
        this.recipes = data.slice(0, 6);
        console.log(this.recipes);
      }
    );

    this.updateSlidesPerView();
    window.addEventListener('resize', this.updateSlidesPerView.bind(this));

  }


  getFlavorName(flavorId: number): string | undefined {
    const flavor = this.flavors.find(f => f.id === flavorId);
    return flavor ? flavor.name : undefined;
  }

  updateSlidesPerView(): void {
    // Adjust the number of slides-per-view based on screen size
    if (window.innerWidth >= 1200) {
      this.slidesPerView = 5;
    } else if (window.innerWidth >= 992) {
      this.slidesPerView = 4;
    } else if (window.innerWidth >= 768) {
      this.slidesPerView = 3;
    } else if (window.innerWidth >= 576) {
      this.slidesPerView = 2;
    } else {
      this.slidesPerView = 1;
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    window.removeEventListener('resize', this.updateSlidesPerView.bind(this));

  }
}
