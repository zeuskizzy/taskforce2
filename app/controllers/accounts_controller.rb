class AccountsController < InheritedResources::Base

  layout :resolve_layout

  before_action :find_account, only: [ :show, :edit, :update, :destroy]
  before_action :authenticate_user!
  before_action :find_users, only: [:index ]
  def index
    @welcomes = Welcome.all.order('created_at DESC')
    @headers = Header.all
    @users = User.where(user_id: current_user)
    @accounts = Account.where(user_id: current_user).order('created_at DESC')
    # @reservations = Reservation.where(user_id: current_user).order('created_at DESC')
    @leaveapps = Leaveapp.where(user_id: current_user).order('created_at DESC')
    @carepacks = Carepack.where(user_id: current_user).order('created_at DESC')

    end
    def show
      @welcomes = Welcome.all.order('created_at DESC')
      @headers = Header.all

      @users = User.where(user_id: current_user)
      @accounts = Account.where(user_id: current_user).order('created_at DESC')
    end
  def new
    @headers = Header.all
    @welcomes = Welcome.all.order('created_at DESC')

    @account = current_user.accounts.build
  end
  def create
    @account = current_user.accounts.build(account_params)
    @account.user_id = current_user.id
    if @account.save
      user = User.find_by_id(@account.user_id)
      account = @account
      # AccountMailer.account_email(user, account).deliver_later
      redirect_to new_vehicle_path, notice: "Welcome To Your Account"
    else
      render 'new', notice: "Please Try Again"
    end
  end

  def edit

  end

  def update
    if @account.update(account_params)
      redirect_to @account
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

  def find_account
    @account = Account.friendly.find(params[:id])
  end

  def find_users
    if params[:id].nil?
      @user = current_user
    end
  end

    def account_params
      params.require(:account).permit(:account_number, :status, :slug, :first_name, :last_name, :state, :relationship, :city, :zipcode, :address, :user_id)
    end

end
