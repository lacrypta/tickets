import { CreatePreferencePayload } from "mercadopago/models/preferences/create-payload.model";

export interface MercadoPagoPreference extends CreatePreferencePayload {
  id: string;
}
