class LeaveappsController < InheritedResources::Base
  layout :resolve_layout

  before_action :find_leaveapp, only: [ :show, :edit, :update, :destroy]
  before_action :authenticate_user!
  before_action :find_users, only: [:index ]
  def index
    @welcomes = Welcome.all.order('created_at DESC')
    @headers = Header.all
    @users = User.where(user_id: current_user)
    @leaveapps = Leaveapp.where(user_id: current_user).order('created_at DESC')

    end
    def show
      @welcomes = Welcome.all.order('created_at DESC')
      @headers = Header.all

      @users = User.where(user_id: current_user)
      @leaveapps = Leaveapp.where(user_id: current_user).order('created_at DESC')
    end
  def new
    @headers = Header.all
    @welcomes = Welcome.all.order('created_at DESC')
    @services = Service.all
    @leaveapp = current_user.leaveapps.build
  end
  def create
    @leaveapp = current_user.leaveapps.build(leaveapp_params)
    @leaveapp.user_id = current_user.id
    if @leaveapp.save
      user = User.find_by_id(@leaveapp.user_id)
      leaveapp = @leaveapp
      # AccountMailer.account_email(user, account).deliver_later
      redirect_to root_path, notice: "Request Submitted, and will be responded to via email"
    else
      render 'new', notice: "Please Try Again"
    end
  end

  def edit

  end

  def update
    if @leaveapp.update(leaveapp_params)
      redirect_to @leaveapp
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

  def find_leaveapp
    @leaveapp = Leaveapp.friendly.find(params[:id])
  end

    def leaveapp_params
      params.require(:leaveapp).permit(:leave_package, :name, :email, :phone, :military_id, :status, :verified, :slug, :message, :date, :price, :duration, :user_id)
    end

end
