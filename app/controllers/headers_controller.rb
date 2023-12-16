class HeadersController < InheritedResources::Base
  before_action :authenticate_adminuser!, except: [:index, :show]

  private

    def header_params
      params.require(:header).permit(:abouts_title, :abouts_sub_title, :services_title, :services_sub_title, :boards_title, :boards_sub_title, :features_title, :features_sub_title, :feedbacks_title, :feedbacks_sub_title, :blogs_title, :blogs_sub_title, :projects_title, :projects_sub_title, :cta1, :cta2, :headerimg, :products_title, :products_sub_title)
    end

end
