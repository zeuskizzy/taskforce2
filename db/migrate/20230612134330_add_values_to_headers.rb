class AddValuesToHeaders < ActiveRecord::Migration[6.1]
  def change
    add_column :headers, :abouts_videolink, :string
    add_column :headers, :abtsectionimg, :string
    add_column :headers, :headertitle, :string
    add_column :headers, :headersub_title, :string
    add_column :headers, :services_videolink, :string
    add_column :headers, :events_title, :string
    add_column :headers, :events_sub_title, :string
    add_column :headers, :company_title, :string
    add_column :headers, :company_sub_title, :string
    add_column :headers, :plans_title, :string
    add_column :headers, :plans_sub_title, :string
    add_column :headers, :plans_desc, :string
    add_column :headers, :admin_title, :string
    add_column :headers, :admin_sub_title, :string
    add_column :headers, :adminlogoimg, :string
    add_column :headers, :tc, :text
  end
end
