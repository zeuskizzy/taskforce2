class VehicleMailer < ApplicationMailer
  default :from => "support@thefavis.site"
  def account_email(user, vehicle)
    @user = user
    @vehicle = vehicle
    mail(to: "hq@kizonia.com", subject: 'New Co-Host Request')
  end
end
