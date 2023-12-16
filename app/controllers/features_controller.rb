class FeaturesController < InheritedResources::Base
  before_action :find_features, only: [ :show, :edit, :update, :destroy]
  before_action :authenticate_adminuser!, except: [:index, :show]
  def index
    @features = Feature.all.order('created_at DESC')
  end

  def show
  end

  private
  def find_features
    @feature = Feature.friendly.find(params[:id])
  end

    def feature_params
      params.require(:feature).permit(:fimg, :title, :sub_title, :body, :slug)
    end

end
