Rails.application.routes.draw do

    # resources :core_curriculums
    # resources :plans
    # resources :students
    # resources :users
    # Routing logic: fallback requests for React Router.
    # Leave this here to help deploy your app later!
    namespace :api do
      namespace :v1 do
        get '/students', to: 'students#index'
        post '/login', to: 'sessions#create'
        delete '/user', to: 'users#destroy_session'
        get '/user', to: 'users#show'
        get '/plans/:id/view', to: 'plans#show'
        get '/students/:id', to: 'students#show'
        get '/plans', to: 'plans#index'
        get '/plans/:id', to: 'plans#show'
        delete '/logout', to: 'sessions#destroy'
        post '/students', to: 'students#create'
        post '/students/:id/edit', to: 'students#update'
        post '/plans/:id/edit', to: 'plans#edit'
        delete '/plans/:id/delete', to: 'plans#destroy'
        post '/plans/new_plan', to: 'plans#create'
      end
    end

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
