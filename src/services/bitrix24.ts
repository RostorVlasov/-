/**
 * Client-side Lead Service for Кот Моне
 * All Bitrix24 credentials and webhook URLs are stored and processed strictly
 * on the backend server (/api/lead). No webhook URLs or tokens are accessible in the browser.
 */

export interface LeadPayload {
  name: string;
  contact: string;
  message?: string;
  topics?: string[];
}

export interface LeadResponse {
  success: boolean;
  leadId?: number;
  message?: string;
}

export async function createBitrixLead(payload: LeadPayload): Promise<LeadResponse> {
  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => ({}))) as {
      success?: boolean;
      leadId?: number;
      message?: string;
    };

    if (response.ok && data.success) {
      return {
        success: true,
        leadId: data.leadId,
      };
    }

    return {
      success: false,
      message: data.message || 'Произошла ошибка при отправке. Пожалуйста, напишите нам в Telegram или позвоните.',
    };
  } catch (error) {
    console.error('Lead submission error:', error);
    return {
      success: false,
      message: 'Не удалось связаться с сервером. Пожалуйста, свяжитесь по телефону +7 993 116-47-72.',
    };
  }
}
