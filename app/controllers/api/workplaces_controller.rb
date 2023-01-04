class Api::WorkplacesController < ApplicationController
    def index
        @workplaces = Workplace.all
        @workplace = Workplace.new
        render :index
    end


    def create
        @workplace = Workplace.new(workplace_params)
        @workplace.admin = current_user
        if @workplace.save
            render :show
        else
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end



    def update
        @workplace = workplace.find_by(id: params[:id])
        @user = User.find_by(id: @workplace.admin_id)
        if @workplace && @user == current_user
            @workplace.update(workplace_params)
            render :show
        else
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end




    private
    def workplace_params
        params.require(:workplace).permit(:name, :url, :admin_id)
    end
end
