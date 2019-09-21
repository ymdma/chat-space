Rails.application.routes.draw do
  root 'groups#index'
  devise_for :users
  resources :messages, only: [:index]
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
end