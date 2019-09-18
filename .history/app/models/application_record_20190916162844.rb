class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
end
root to: "messages#index"


resources :messages, only: [:index]

