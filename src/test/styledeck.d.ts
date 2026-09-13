/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
// oxlint-disable typescript/no-empty-interface typescript/consistent-indexed-object-style
// oxlint-disable unicorn/require-module-specifiers

export {}

/** */

declare module 'styledeck' {
  interface CSSProperties extends CommonProperties {
    [key: StyleXVar<unknown>]: NonNullable<unknown>
  }

  interface CSSFeatures {
    atRules: AtRule[]
    attributeSelectors: AttributeSelector[]
    pseudoClasses: PseudoClass[]
    pseudoElements: PseudoElement[]
  }
}

type AtRule = CommonAtRule | `${CommonAtRule} ${string}`

type AttributeSelector =
  | CommonAttributeSelector
  | (CommonAttributeSelector extends `[${infer Attribute}]`
      ? `[${Attribute}=${string}]`
      : never)

type PseudoClass =
  | Exclude<CommonPseudoClass, ParameterizedPseudoClass>
  | `${ParameterizedPseudoClass}(`
  | `${ParameterizedPseudoClass}${string})`

type PseudoElement =
  | Exclude<CommonPseudoElement, ParameterizedPseudoElement>
  | `${ParameterizedPseudoElement}(`
  | `${ParameterizedPseudoElement}${string})`
  // ::cue can be used both with and without parameter
  | '::cue'

type CommonPseudoClass = Exclude<CommonPseudo, CommonPseudoElement>

type CommonPseudoElement =
  | Extract<CommonPseudo, `::${string}`>
  // one-colon pseudo-elements
  | ':after'
  | ':before'
  | ':first-letter'
  | ':first-line'
  | ':-moz-placeholder'
  | ':-ms-input-placeholder'

type ParameterizedPseudoClass =
  | ':active-view-transition-type'
  | ':dir'
  | ':has'
  | ':heading'
  | ':host-context'
  | ':host'
  | ':is'
  | ':lang'
  | ':not'
  | ':nth-child'
  | ':nth-last-child'
  | ':nth-last-of-type'
  | ':nth-of-type'
  | ':state'
  | ':where'

type ParameterizedPseudoElement =
  | '::cue'
  | '::highlight'
  | '::part'
  | '::picker'
  | '::scroll-button'
  | '::slotted'
  | '::view-transition-group'
  | '::view-transition-image-pair'
  | '::view-transition-new'
  | '::view-transition-old'

import type { AtRules as CommonAtRule } from 'csstype'
import type { HtmlAttributes as CommonAttributeSelector } from 'csstype'
import type { Properties as CommonProperties } from 'csstype'
import type { Pseudos as CommonPseudo } from 'csstype'
import type { StyleXVar } from '@stylexjs/stylex'
//
