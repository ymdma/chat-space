class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
end
resources :messages, only: [:index]

