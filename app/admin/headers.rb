ActiveAdmin.register Header do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
   permit_params :abouts_title, :abouts_sub_title, :services_title,
   :services_sub_title, :boards_title, :boards_sub_title,
   :features_title, :features_sub_title, :feedbacks_title, :feedbacks_sub_title,
    :blogs_title, :blogs_sub_title, :projects_title, :projects_sub_title, :cta1,
     :cta2, :headerimg, :products_title, :products_sub_title, :headertext, :headersubtext, :abouts_videolink, :abtsectionimg, :headertitle, :headersub_title, :services_videolink, :events_title, :events_sub_title, :company_title, :company_sub_title, :plans_title, :plans_sub_title, :plans_desc, :admin_title, :admin_sub_title, :adminlogoimg, :tc
  #
  # permit_params do
  #   permitted = [:abouts_title, :abouts_sub_title, :services_title, :services_sub_title, :boards_title, :boards_sub_title, :features_title, :features_sub_title, :feedbacks_title, :feedbacks_sub_title, :blogs_title, :blogs_sub_title, :projects_title, :projects_sub_title, :cta1, :cta2, :headerimg, :products_title, :products_sub_title]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
  form(:html => { :multipart => true }) do |f|
    f.inputs do


      para "headerimg login or signup"
      f.input :headertext, placeholder: "Mast Header Title"
      f.input :headerimg, as: :file


      para "abouts/who we are"
      f.input :abouts_title, placeholder: "About Us Header Title"
      f.input :abouts_sub_title
      f.input :abouts_videolink, placeholder: "Youtube Link"
      f.input :abtsectionimg, as: :file


      para "Services/brand"

      f.input :services_title
      f.input :services_sub_title
      f.input :services_videolink, placeholder: "Youtube Link"


      para "features/how it works/section"

      f.input :features_title
      f.input :features_sub_title

      para "Feedbacks and review"

      f.input :feedbacks_title, placeholder: "Review Title"
      f.input :feedbacks_sub_title, placeholder: "Reviews Sub Title"

      para "Locations  "

      f.input :events_title, placeholder: "Locations "
      f.input :events_sub_title


      para "company header"
      f.input :headerimg, as: :file

      f.input :company_title, placeholder: "Headline Sponsor header title"
      f.input :company_sub_title
      f.input :headersubtext, as: :quill_editor


      para "Rentals"
      f.input :projects_title, placeholder: "Rentals"
      f.input :projects_sub_title

      para "blog"

      f.input :blogs_title
      f.input :blogs_sub_title

      para "plans"

      f.input :plans_title
      f.input :plans_sub_title
      f.input :plans_desc

      para "Lux Listings"
      f.input :products_title
      f.input :products_sub_title


      para "Admin COntent"
      f.input :admin_title, placeholder: "Log In header"
      f.input :admin_sub_title
      f.input :adminlogoimg, as: :file



      para "Terms & Conditions"
      f.input :tc, as: :quill_editor

      para "call to action-1"
      f.input :cta1
      f.input :cta2



    end
    f.actions
  end
end
