Rails.application.routes.draw do
  
  resources :plans
  resources :students
  resources :users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/user', to: 'users#show'
  delete '/user', to: 'users#destroy'
  get '/students', to: 'students#index'
  get '/students/:id', to: 'students#show'
  post '/students/new-student', to: 'students#create'
  post '/students/:id/edit', to: 'students#update'
  get '/plans', to: 'plans#index'
  get '/plans/:id', to: 'plans#show'
  post '/plans/:id/edit', to: 'plans#edit'
  delete '/plans/:id/delete', to: 'plans#destroy'
  get '/plans/:id/view', to: 'plans#show'
  post '/plans/new_plan', to: 'plans#create'
  


end
