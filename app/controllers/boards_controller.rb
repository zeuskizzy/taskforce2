class BoardsController < InheritedResources::Base
  before_action :find_boards, only: [ :show, :edit, :update, :destroy]
  before_action :authenticate_adminuser!, except: [:index, :show]
  def index
  @boards = Board.all.order('created_at ASC')
  @headers = Header.all

  end
  def show
    @headers = Header.all

  end
  private
    def find_boards
      @board = Board.friendly.find(params[:id])
    end
    def board_params
      params.require(:board).permit(:title, :name, :body, :boardimg, :slug, :icon)
    end

end
