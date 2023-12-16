class ContactsController < InheritedResources::Base

  private

    def contact_params
      params.require(:contact).permit(:name, :email, :phone, :body)
    end

end
