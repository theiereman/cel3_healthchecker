class Admin::CelsController < ApplicationController
  http_basic_authenticate_with name: Rails.application.credentials.admin_auth.username, password: Rails.application.credentials.admin_auth.password
  before_action :set_cel, only: %i[ update destroy ]
  use_inertia_instance_props

  def index
    @cels = Cel.all
    render inertia: true
  end

  def create
    @cel = Cel.new(cel_params)

      if @cel.save
        redirect_to admin_cels_path, notice: "Cel was successfully created."
      else
        render :new, status: :unprocessable_entity
      end
  end

  def update
      if @cel.update(cel_params)
        redirect_to admin_cels_path, notice: "Cel was successfully updated."
      else
        render :edit, status: :unprocessable_entity
      end
  end

  def destroy
    @cel.destroy!
    redirect_to admin_cels_path
  end

  private

  def set_cel
    @cel = Cel.find(params.expect(:id))
  end

  def cel_params
    params.expect(cel: [ :name, :url ])
  end
end
