if Rails.env.production?
  ActionMailer::Base.delivery_method = :smtp
  ActionMailer::Base.smtp_settings = {
  :user_name => 'api',
  :password => '2da8e27e41ea45ffe34272bd6a9cee0a',
  :address => 'live.smtp.mailtrap.io',
  :host => 'live.smtp.mailtrap.io',
  :port => '25',
  :authentication => :cram_md5
}

end
