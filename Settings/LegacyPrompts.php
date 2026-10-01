<?php
/**
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\ChatGPT\Settings;

use Piwik\Piwik;

/**
 * Default prompts of previous plugin versions.
 *
 * Saving the settings form stores every value, so the previous default prompts are saved in most installs: they
 * would hide the new defaults forever. A stored prompt equal to one of them, in any language, is replaced by the
 * new default in the language of the current user. A custom prompt is never changed, nothing is written to the
 * database.
 */
final class LegacyPrompts
{
    public const CHAT = 'chat';
    public const INSIGHT = 'insight';

    public const TRANSLATION_KEYS = [
        self::CHAT => 'ChatGPT_ChatBasePromptDefault',
        self::INSIGHT => 'ChatGPT_InsightBasePromptDefault',
    ];

    /**
     * Previous default prompts, by prompt and language, trimmed
     */
    public const DEFAULTS = [
        self::CHAT => [
            'ar' => [
                'أنت خبير في Matomo وتعرف كل شيء عن التحليلات الرقمية. يجب أن تكون إجابتك كاملة ودقيقة.',
            ],
            'de' => [
                'Sie sind ein Matomo-Experte und wissen alles über digitale Analytik. Ihre Antwort sollte vollständig und präzise sein.',
            ],
            'en' => [
                'You are a Matomo expert and know everything about digital analytics. Your answer should be complete and precise.',
            ],
            'es' => [
                'Eres un experto en Matomo y sabes todo sobre análisis digital. Tu respuesta debe ser completa y precisa.',
            ],
            'fr' => [
                'Vous êtes un expert Matomo et connaissez tout sur l\'analyse digitale. Votre réponse doit être complète et précise.',
            ],
            'it' => [
                'Sei un esperto di Matomo e sai tutto sull\'analisi digitale. La tua risposta deve essere completa e precisa.',
            ],
            'ja' => [
                'あなたは Matomo の専門家で、デジタル分析のすべてを熟知しています。回答は網羅的かつ正確にしてください。',
            ],
            'nl' => [
                'U bent een Matomo-expert en weet alles over digitale analyse. Uw antwoord moet volledig en nauwkeurig zijn.',
            ],
            'pl' => [
                'Jesteś ekspertem Matomo i wiesz wszystko o analityce cyfrowej. Twoja odpowiedź powinna być kompletna i precyzyjna.',
            ],
            'pt' => [
                'És um especialista em Matomo e sabes tudo sobre analytics digital. A tua resposta deve ser completa e precisa.',
            ],
            'sv' => [
                'Du är en Matomo-expert och vet allt om digital analys. Ditt svar ska vara fullständigt och precist.',
            ],
            'zh-cn' => [
                '你是一位 Matomo 专家，精通数字分析的方方面面。你的回答应当完整而准确。',
            ],
            'zh-tw' => [
                '你是 Matomo 專家，精通數位分析的一切。你的回答應該完整且精確。',
            ],
        ],
        self::INSIGHT => [
            'ar' => [
                'قدّم لي رؤى من مجموعة البيانات المنسّقة بصيغة JSON أدناه، واجعل أهم المقاييس في إجابتك بخط عريض:',
            ],
            'de' => [
                'Geben Sie mir Einblicke aus dem unten im JSON-Format bereitgestellten Datensatz, heben Sie die wichtigsten Metriken Ihrer Antwort fett hervor:',
            ],
            'en' => [
                'Give me insights from the dataset formatted in JSON provided below, add bold style to most important metrics of your answer:',
                'Give me insights from the dataset formatted in JSON provided below, add bold style to most important metrics of your answer :',
            ],
            'es' => [
                'Dame análisis del conjunto de datos en formato JSON proporcionado a continuación, resalta en negrita las métricas más importantes de tu respuesta:',
            ],
            'fr' => [
                'Donnez-moi des analyses à partir du jeu de données au format JSON ci-dessous, mettez en gras les métriques les plus importantes de votre réponse :',
            ],
            'it' => [
                'Dammi approfondimenti dal dataset in formato JSON fornito di seguito, evidenzia in grassetto le metriche più importanti della tua risposta:',
            ],
            'ja' => [
                '以下に JSON 形式で提供するデータセットからインサイトを示してください。回答の中で最も重要な指標は太字にしてください:',
            ],
            'nl' => [
                'Geef me inzichten uit de dataset in JSON-formaat hieronder, markeer de belangrijkste statistieken van uw antwoord vetgedrukt:',
            ],
            'pl' => [
                'Przedstaw wnioski z poniższego zbioru danych w formacie JSON, wyróżnij pogrubieniem najważniejsze metryki w swojej odpowiedzi:',
            ],
            'pt' => [
                'Dá-me insights a partir do conjunto de dados em formato JSON fornecido abaixo e coloca a negrito as métricas mais importantes da tua resposta:',
            ],
            'sv' => [
                'Ge mig insikter från datasetet i JSON-format nedan, markera de viktigaste måtten i ditt svar med fetstil:',
            ],
            'zh-cn' => [
                '根据下方以 JSON 格式提供的数据集给出洞察，并将回答中最重要的指标加粗：',
            ],
            'zh-tw' => [
                '請根據下方以 JSON 格式提供的資料集給我洞察，並將回答中最重要的指標以粗體標示：',
            ],
        ],
    ];

    public static function isLegacyDefault(string $kind, string $prompt): bool
    {
        $prompt = trim($prompt);
        foreach (self::DEFAULTS[$kind] ?? [] as $legacyPrompts) {
            if (in_array($prompt, $legacyPrompts, true)) {
                return true;
            }
        }

        return false;
    }

    /**
     * The default replaces an empty prompt and a default prompt of a previous version, a custom prompt is kept.
     */
    public static function resolve(string $kind, string $prompt, string $default): string
    {
        if (trim($prompt) === '' || self::isLegacyDefault($kind, $prompt)) {
            return $default;
        }

        return $prompt;
    }

    /**
     * Current default prompt, in the language of the current user
     */
    public static function getDefault(string $kind): string
    {
        return Piwik::translate(self::TRANSLATION_KEYS[$kind]);
    }
}
