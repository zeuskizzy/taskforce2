class ReporescuesController < InheritedResources::Base


    layout :resolve_layout

    before_action :find_reporescue, only: [ :show, :edit, :update, :destroy]
    before_action :authenticate_user!
    before_action :find_users, only: [:index ]
    def index
      @welcomes = Welcome.all.order('created_at DESC')
      @headers = Header.all
      @users = User.where(user_id: current_user)
      @reporescues = Reporescue.where(user_id: current_user).order('created_at DESC')

      end
      def show
        @welcomes = Welcome.all.order('created_at DESC')
        @headers = Header.all

        @users = User.where(user_id: current_user)
        @reporescues = Reporescue.where(user_id: current_user).order('created_at DESC')
      end
    def new
      @headers = Header.all
      @welcomes = Welcome.all.order('created_at DESC')

      @reporescue = current_user.reporescues.build
    end
    def create
      @reporescue = current_user.reporescues.build(reporescue_params)
      @reporescue.user_id = current_user.id
      if @reporescue.save
        user = User.find_by_id(@reporescue.user_id)
        reporescue = @reporescue
        # reporescueMailer.reporescue_email(user, reporescue).deliver_later
        redirect_to reporescues_path, notice: "Information Uploaded. Please wait for confirmation"
      else
        render 'new', notice: "Please Try Again"
      end
    end

    def edit

    end

    def update
      if @reporescue.update(reporescue_params)
        redirect_to @reporescue
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

    def find_reporescue
      @reporescue = Reporescue.friendly.find(params[:id])
    end

    def find_users
      if params[:id].nil?
        @user = current_user
      end
    end

    def reporescue_params
      params.require(:reporescue).permit(:v_debt, :repo_time, :repo_plan, :v_name, :v_type, :v_info, :v_model, :status, :user_id, :slug, :pk_address, :d_address, :phone, :vrepoimg)
    end

end
