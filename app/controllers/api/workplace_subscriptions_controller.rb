class Api::WorkplaceSubscriptionsController < ApplicationController
    def index
       
        @user = User.find_by(id: params[:user_id])
        @subscriptions = @user.workplace_subscriptions
        render :index
    end

    def create
        @subscription = workplace_subscription.new(workplace_subscription_params)
        @subscription.admin = current_user
        if @subscription.save
            render :show
        else
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    
     private
    def workplace_subscription_params
        params.require(:workplace_subscription).permit(:user_id, :workplace_id)
    end
end
