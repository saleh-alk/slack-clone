class Api::WorkplaceSubscriptionsController < ApplicationController
    def index
       
        @user = User.find_by(id: params[:user_id])
        render :index
    end

    def create
        @user = User.find_by(username: params[:username])
        if @user 
            @subscription = WorkplaceSubscription.new(user_id: @user.id, workplace_id: params[:workplace_id] )
            
            if @subscription.save
                #render :show
            else
                render json: { errors: @subscription.errors.full_messages }, status: :unprocessable_entity
            end
        end
       
    end

    def show
        @subs = WorkplaceSubscription.where("workplace_id = #{params[:id]}")

        render :show
    end

    
     private
    def workplace_subscription_params
        params.require(:workplace_subscription).permit(:user_id, :workplace_id)
    end
end
