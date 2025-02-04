CREATE OR REPLACE FUNCTION set_default_model(model_id uuid)
RETURNS void AS $$
BEGIN
  -- First, set all models to not default
  UPDATE ai_models SET is_default = false;
  
  -- Then set the specified model as default
  UPDATE ai_models SET is_default = true WHERE id = model_id;
END;
$$ LANGUAGE plpgsql;