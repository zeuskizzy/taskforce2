ActiveAdmin.register Listingcat do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
   permit_params :title, :status, :catcarimg, :iframelink, :slug
  #
  # or
  #
  # permit_params do
  #   permitted = [:title, :status, :catcarimg, :iframelink]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  form(:html => { :multipart => true }) do |f|
    f.inputs do
      f.input :catcarimg, :as => :file

      f.input :title
      f.input :status
      f.input :iframelink
    end
    f.actions
  end

  controller do
         def find_resource
           scoped_collection.friendly.find(params[:id])
         end
       end
end
