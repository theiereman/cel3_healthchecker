Rails.application.routes.draw do
  resources :cels, only: [ :index ] do
    member do
      get "healthcheck"
    end
  end

  namespace :admin do
    resources :cels, except: [ :show ]
  end

  get "up" => "rails/health#show", as: :rails_health_check

  root "cels#index"
end
