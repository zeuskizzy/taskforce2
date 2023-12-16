class ListingcatsController < InheritedResources::Base

  before_action :find_listingcats, only: [ :show, :edit, :update, :destroy]
  before_action :authenticate_adminuser!, except: [:index, :show]
  def index
    @listingcats = Listingcat.all
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
     @luxListingitems = LuxListingitem.all.order('created_at ASC')

  end

  def show
    @listingcats = Listingcat.all
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
  def find_listingcats
    @listingcat = Listingcat.friendly.find(params[:id])
  end

    def listingcat_params
      params.require(:listingcat).permit(:title, :status, :catcarimg, :slug)
    end

end
