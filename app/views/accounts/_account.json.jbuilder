json.extract! account, :id, :account_number, :status, :slug, :user_id, :created_at, :updated_at
json.url account_url(account, format: :json)
