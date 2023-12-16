class VehiclesController < InheritedResources::Base

  layout :resolve_layout

  before_action :find_vehicle, only: [ :show, :edit, :update, :destroy]
  before_action :authenticate_user!
  before_action :find_users, only: [:index ]
  def index
    @welcomes = Welcome.all.order('created_at DESC')
    @headers = Header.all
    @users = User.where(user_id: current_user)
    @vehicles = Vehicle.where(user_id: current_user).order('created_at DESC')

    end
    def show
      @welcomes = Welcome.all.order('created_at DESC')
      @headers = Header.all

      @users = User.where(user_id: current_user)
      @vehicles = Vehicle.where(user_id: current_user).order('created_at DESC')
    end
  def new
    @headers = Header.all
    @welcomes = Welcome.all.order('created_at DESC')

    @vehicle = current_user.vehicles.build
  end
  def create
    @vehicle = current_user.vehicles.build(vehicle_params)
    @vehicle.user_id = current_user.id
    if @vehicle.save
      user = User.find_by_id(@vehicle.user_id)
      vehicle = @vehicle
       VehicleMailer.vehicle_email(user, vehicle).deliver
      redirect_to vehicles_path, notice: "Information Uploaded. Please wait for confirmation"
    else
      render 'new', notice: "Please Try Again"
    end
  end

  def edit

  end

  def update
    if @vehicle.update(vehicle_params)
      redirect_to @vehicle
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

  def find_vehicle
    @vehicle = Vehicle.friendly.find(params[:id])
  end

  def find_users
    if params[:id].nil?
      @user = current_user
    end
  end
    def vehicle_params
      params.require(:vehicle).permit(:l_first_name, :status, :l_last_name, :l_address, :l_email, :v_name, :v_type, :v_plate_number, :v_info, :l_phone, :slug, :user_id)
    end

end
