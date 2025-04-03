class CelsController < ApplicationController
  before_action :set_cel, only: %i[ edit update destroy ]

  # GET /cels or /cels.json
  def index
    @cels = Cel.all
    render inertia: "cels/index", props: { cels: @cels }
  end

  def healthcheck
    cel = Cel.find(params[:id])
    render json: HealthCheck::HealthCheckService.check(cel.url)
  end

  # GET /cels/new
  def new
    @cel = Cel.new
  end

  # GET /cels/1/edit
  def edit
  end

  # POST /cels or /cels.json
  def create
    @cel = Cel.new(cel_params)

    respond_to do |format|
      if @cel.save
        format.html { redirect_to @cel, notice: "Cel was successfully created." }
        format.json { render :show, status: :created, location: @cel }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @cel.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /cels/1 or /cels/1.json
  def update
    respond_to do |format|
      if @cel.update(cel_params)
        format.html { redirect_to @cel, notice: "Cel was successfully updated." }
        format.json { render :show, status: :ok, location: @cel }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @cel.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /cels/1 or /cels/1.json
  def destroy
    @cel.destroy!

    respond_to do |format|
      format.html { redirect_to cels_path, status: :see_other, notice: "Cel was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_cel
      @cel = Cel.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def cel_params
      params.expect(cel: [ :name, :url ])
    end
end
