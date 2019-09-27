class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages

  validates :name, presence: true, uniqueness: true

  def show_last_message
    if (last_message = messages.last).present?
      last_message.content? ? last_message.content : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end

end

# show --三項演算子を用いない場合--
# def show_last_message
#   if (last_message = messages.last).present?
#     if last_message.content?
#      last_message.content
#     else
#       '画像が投稿されています'
#     end
#   else
#     'まだメッセージはありません。'
#   end