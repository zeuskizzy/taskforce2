json.extract! contact, :id, :name, :email, :phone, :body, :created_at, :updated_at
json.url contact_url(contact, format: :json)
