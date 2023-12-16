class FaqsController < InheritedResources::Base

  before_action :find_faqs, only: [ :show, :edit, :update, :destroy]
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

  end

  def show
  end

  private
  def find_faqs
    @faq = Faq.friendly.find(params[:id])
  end
  def faqs_param
      params.require(:faq).permit(:title,:slug, :sub_title, :body)
    end
end
