Rails.application.routes.draw do

  resources :bookings
  resources :rentals do
    resources :rentalproducts

  end
  resources :locations
  resources :contacts
  devise_for :users
  resources :welcomes
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  authenticated :user do
    root 'accounts#index', as: "authenticated_root"
  end


  resources :lux_listingitems
  resources :listingcats do
    resources :listingitems
  end

  resources :csections
  resources :reporescues
  resources :reporepairs
  resources :vehicles
  resources :accounts
  resources :faqs
  resources :headers
  resources :plans
  resources :reviews
  resources :features
  resources :boards
  resources :services do
    resources :sections

  end
  resources :banners
  resources :blogs
  resources :abouts



  root "welcomes#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
