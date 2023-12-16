ActiveAdmin.register Banner do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
   permit_params :title, :sub_title, :bannerimg, :slug
  #
  # or
  #
  # permit_params do
  #   permitted = [:title, :sub_title, :bannerimg, :slug]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  form(:html => { :multipart => true }) do |f|
     f.inputs do
      f.input :title
      f.input :bannerimg, :as => :file
      f.input :sub_title

    end
    f.actions
  end
end
