import { Currency } from "mercadopago/shared/currency";

export interface PreferenceItem {
  /** Indentificador do item. */
  id?: string | undefined;
  /** Título do item, é apresentado o fluxo de pagamento. */
  title?: string | undefined;
  /** Descrição do artigo. */
  description?: string | undefined;
  /** URL da imagem do anúncio. */
  picture_url?: string | undefined;
  /** Identificador da categoria do item. */
  category_id?: string | undefined;
  /** Quantidade de itens. */
  quantity?: number | undefined;
  /** Identificador de moeda em formato ISO_4217. */
  currency_id?: Currency | undefined;
  /** Preço unitário. */
  unit_price?: number | undefined;
}
