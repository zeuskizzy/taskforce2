class ReporepairsController < InheritedResources::Base


    layout :resolve_layout

    before_action :find_reporepair, only: [ :show, :edit, :update, :destroy]
    before_action :authenticate_user!
    before_action :find_users, only: [:index ]
    def index
      @welcomes = Welcome.all.order('created_at DESC')
      @headers = Header.all
      @users = User.where(user_id: current_user)
      @reporepairs = Reporepair.where(user_id: current_user).order('created_at DESC')

      end
      def show
        @welcomes = Welcome.all.order('created_at DESC')
        @headers = Header.all

        @users = User.where(user_id: current_user)
        @reporepairs = Reporepair.where(user_id: current_user).order('created_at DESC')
      end
    def new
      @headers = Header.all
      @welcomes = Welcome.all.order('created_at DESC')

      @reporepair = current_user.reporepairs.build
    end
    def create
      @reporepair = current_user.reporepairs.build(reporepair_params)
      @reporepair.user_id = current_user.id
      if @reporepair.save
        user = User.find_by_id(@reporepair.user_id)
        reporepair = @reporepair
        # reporepairMailer.reporepair_email(user, reporepair).deliver_later
        redirect_to reporepairs_path, notice: "Information Uploaded. Please wait for confirmation"
      else
        render 'new', notice: "Please Try Again"
      end
    end

    def edit

    end

    def update
      if @reporepair.update(reporepair_params)
        redirect_to @reporepair
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

    def find_reporepair
      @reporepair = Reporepair.friendly.find(params[:id])
    end

    def find_users
      if params[:id].nil?
        @user = current_user
      end
    end
    def reporepair_params
      params.require(:reporepair).permit(:v_name, :v_type, :v_info, :v_model, :status, :user_id, :slug, :pk_address, :d_address, :phone, :vimg)
    end

end
