Rails.application.routes.draw do
  
  resources :plans
  resources :students
  resources :users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get '/user', to: 'users#show'
  delete '/user', to: 'users#destroy'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/students', to: 'students#index'
  get '/plans', to: 'plans#index'
  get '/students/:id', to: 'students#show'
  post '/students/:id/edit', to: 'students#update'
  get '/plans/:id', to: 'plans#show'
  post '/plans/:id/edit', to: 'plans#edit'
  post '/plans/:id/delete', to: 'plans#destroy'
  get '/plans/:id/view', to: 'plans#show'
  


end
