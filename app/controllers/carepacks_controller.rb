class CarepacksController < InheritedResources::Base

  layout :resolve_layout

  before_action :find_carepack, only: [ :show, :edit, :update, :destroy]
  before_action :authenticate_user!
  before_action :find_users, only: [:index ]
  def index
    @welcomes = Welcome.all.order('created_at DESC')
    @headers = Header.all
    @users = User.where(user_id: current_user)
    @carepacks = Carepack.where(user_id: current_user).order('created_at DESC')

    end
    def show
      @welcomes = Welcome.all.order('created_at DESC')
      @headers = Header.all

      @users = User.where(user_id: current_user)
      @carepacks = Carepack.where(user_id: current_user).order('created_at DESC')
    end
  def new
    @headers = Header.all
    @welcomes = Welcome.all.order('created_at DESC')

    @carepack = current_user.carepacks.build
  end
  def create
    @carepack = current_user.carepacks.build(carepack_params)
    @carepack.user_id = current_user.id
    if @carepack.save
      user = User.find_by_id(@carepack.user_id)
      carepack = @carepack
      # AccountMailer.account_email(user, account).deliver_later
      redirect_to carepacks_path, notice: "Request Submitted, and will be responded to via email"
    else
      render 'new', notice: "Please Try Again"
    end
  end

  def edit

  end

  def update
    if @carepack.update(carepack_params)
      redirect_to @carepack
    else
      render 'edit'
    end
  end

  private

  def resolve_layout
    case action_name
    when "new", "create"
      "devise"
    when "index", "show"
      "accounts"
    else
      "application"
    end
  end

  def find_carepack
    @carepack = Carepack.friendly.find(params[:id])
  end

  def find_users
    if params[:id].nil?
      @user = current_user
    end
  end


    def carepack_params
      params.require(:carepack).permit(:leave_package, :name, :email, :phone, :military_id, :status, :verified, :slug, :message, :date, :price, :duration, :user_id)
    end

end
