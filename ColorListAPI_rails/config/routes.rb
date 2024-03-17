Rails.application.routes.draw do
  resources :colors

  # add an OPTIONS route for "DIY" CORS
  # The better answer is to use the rack-cors ruby gem
  # match '/colors(/:id)' => 'colors#options', via: [:options]


  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
