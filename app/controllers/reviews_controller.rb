class ReviewsController < InheritedResources::Base

  before_action :find_reviews, only: [ :show, :edit, :update, :destroy]
  before_action :authenticate_adminuser!, except: [:index, :show]
  def index
    @reviews = Review.all.order('created_at DESC')
    @headers = Header.all

  end

  def show
    @headers = Header.all

  end

  private
  def find_reviews
    @review = Review.friendly.find(params[:id])
  end

    def review_params
      params.require(:review).permit(:title, :icon, :body, :slug)
    end

end
