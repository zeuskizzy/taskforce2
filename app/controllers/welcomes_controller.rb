class WelcomesController < InheritedResources::Base
  def index
    @welcomes = Welcome.all
    @abouts = About.all.order('created_at DESC')
    @headers = Header.all.order('created_at DESC')
@luxListingitems = LuxListingitem.all.order('created_at ASC')
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
  private

    def welcome_params
      params.require(:welcome).permit(:title, :logoimg, :desc, :whatsapp, :ig, :ln, :section, :link, :footer, :phone, :address, :twitter, :email, :youtube, :telegram)
    end

end
