class ColorsController < ApplicationController
  before_action :set_color, only: %i[ show update destroy ]

  # GET /colors
  def index
    @colors = Color.all

    render json: @colors
  end

  # GET /colors/1
  def show
    render json: @color
  end

  # POST /colors
  def create
    @color = Color.new(color_params)

    if @color.save
      render json: @color, status: :created, location: @color
    else
      render json: @color.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /colors/1
  def update
    if @color.update(color_params)
      render json: @color
    else
      render json: @color.errors, status: :unprocessable_entity
    end
  end

  # DELETE /colors/1
  def destroy
    @color.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_color
      @color = Color.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def color_params
      params.require(:color).permit(:title, :uuid, :color, :rating)
    end
end
