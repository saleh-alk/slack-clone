class Api::WorkplacesController < ApplicationController
    def index
    
        @user = User.find_by(id: params[:user_id])
        @workplaces = @user.workplaces[0] ? @user.workplaces : @user.subscribed_workplaces
        
        render :index
    end



    def create
        @workplace = Workplace.new(workplace_params)
        @workplace.admin = current_user
        if @workplace.save!
            render :show
        else
            render json: { errors: @workplace.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        @workplace = Workplace.find_by(id: params[:id])
        render :show
    end

    def destroy
        @workplace = Workplace.find_by(id: params[:id])
        @workplace.destroy
        render json: nil, status: :ok
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
