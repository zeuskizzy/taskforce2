class LuxListingitemsController < InheritedResources::Base
  before_action :find_luxlistingitems, only: [ :show, :edit, :update, :destroy]
  before_action :authenticate_adminuser!, except: [:index, :show]


  def index
    @luxListingitems = LuxListingitem.all
    @welcomes = Welcome.all
    @abouts = About.all.order('created_at DESC')
    @headers = Header.all.order('created_at DESC')

    @services = Service.all.order('created_at ASC')
    @faqs = Faq.all.order('created_at DESC')
    @blogs = Blog.all.order('created_at DESC')
    @reviews = Review.all.order('created_at DESC')
    @features = Feature.all.order('created_at ASC')
    @banners = Banner.all.order('created_at ASC')
    @sections = Section.all.order('created_at DESC')
     @boards = Board.all.order('created_at DESC')
     @csections = Csection.all
   @rentals = Rental.all.order('created_at ASC')
  end

  def show

  end
  private
  def find_luxlistingitems
    @luxListingitem = LuxListingitem.friendly.find(params[:id])
  end

    def lux_listingitem_params
      params.require(:lux_listingitem).permit(:luximg, :luximg2, :iframelink, :mileage, :bodytype, :doors, :engine, :transmission, :drivetrain, :exteriorcolor, :interiorcolor, :condition, :feul, :title, :slug, :listingcat, :references)
    end

end
