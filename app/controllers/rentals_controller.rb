class RentalsController < InheritedResources::Base

    before_action :find_rentals, only: [ :show, :edit, :update, :destroy]
    before_action :authenticate_adminuser!, except: [:index, :show]
    def index
      @rentals = Rental.all.order('created_at ASC')
      @welcomes = Welcome.all
      @abouts = About.all.order('created_at DESC')
      @headers = Header.all.order('created_at DESC')
      @services = Service.all.order('created_at DESC')
      @faqs = Faq.all.order('created_at DESC')
      @blogs = Blog.all.order('created_at DESC')
      @reviews = Review.all.order('created_at DESC')
      @features = Feature.all.order('created_at DESC')
      @banners = Banner.all.order('created_at ASC')
      @sections = Section.all.order('created_at DESC')
       @boards = Board.all.order('created_at DESC')

    end

    def show
      @rentals = Rental.all.order('created_at ASC')
      @welcomes = Welcome.all
      @abouts = About.all.order('created_at DESC')
      @headers = Header.all.order('created_at DESC')
      @services = Service.all.order('created_at DESC')
      @faqs = Faq.all.order('created_at DESC')
      @blogs = Blog.all.order('created_at DESC')
      @reviews = Review.all.order('created_at DESC')
      @features = Feature.all.order('created_at DESC')
      @banners = Banner.all.order('created_at ASC')
      @sections = Section.all.order('created_at DESC')
       @boards = Board.all.order('created_at DESC')

    end

    private
    def find_rentals
      @rental = Rental.friendly.find(params[:id])
    end

    def rental_params
      params.require(:rental).permit(:title, :sub_title, :rentalimg, :rentalheaderimg, :address, :slug)
    end

end
