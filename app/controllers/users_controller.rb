class UsersController < ApplicationController

  before_action :authenticate_user!

  def index
    # binding.pry
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").where.not(id: current_user.id)###### @usersを,検索機能を持たせた変数のオブジェクトにする！ nameのカラムの値から一致する値を全部出す （LIKE句によって）
    respond_to do |user|
      user.html
      user.json
    end
  end


  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end


  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

end