import DateTimeFormatOptions = Intl.DateTimeFormatOptions

export class DateUtils {

  public static readonly FORMAT_MMM_DD: DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
  }

  public static readonly FORMAT_MM: DateTimeFormatOptions = {
    month: 'short'
  }

  public static readonly FORMAT_YYYY_HH: DateTimeFormatOptions = {
    hour: '2-digit',
    year: 'numeric'
  }

  public static readonly DATE_FORMAT_SHORT: DateTimeFormatOptions = {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
  }

  public static readonly FORMAT_MMSHORT_DD_YYYY: DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }

  public static readonly FORMAT_YYYY_MM_DD: DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }


  public static readonly FORMAT_MM_DD_YYYY: DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit'
  }

  public static readonly FORMAT_HH_MM_SS: DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }

  public static readonly FORMAT_HH_MM: DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }

  public static readonly FORMAT_YY_MM_DD_HH_mm: DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  }

  public static toFormat(value: number | Date | undefined, format ?: DateTimeFormatOptions): string {
    if (!value) {
      return ''
    }

    const date: Date = typeof value === 'number' ? new Date(value) : value

    if (!(date instanceof Date)) { //
      return ''
    }

    return format ? (
      (format.day || format.month || format.year)
        ? date.toLocaleDateString([navigator.language], format)
        : date.toLocaleString([navigator.language], format)
    ) : date.toString()

  }
}
