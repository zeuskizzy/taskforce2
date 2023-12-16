class AboutsController < InheritedResources::Base

  before_action :find_abouts, only: [ :show, :edit, :update, :destroy]
  before_action :authenticate_adminuser!, except: [:index, :show]
  def index
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
     @csections = Csection.all

  end

  def show
    @welcomes = Welcome.all
    @csections = Csection.all

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
  def find_abouts
    @about = About.friendly.find(params[:id])
  end
    def about_params
      params.require(:about).permit(:title, :sub_title, :body, :abtimg, :slug, :icon)
    end

end
