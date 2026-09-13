/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
// oxlint-disable typescript/no-empty-interface typescript/consistent-indexed-object-style
// oxlint-disable unicorn/require-module-specifiers

export {}

declare module 'styledeck' {
  interface CSSProperties extends CommonCSSProperties {
    [key: CompiledCSSVar<unknown>]: NonNullable<unknown>
  }

  interface CSSFeatures {
    attributeSelector:
      | AttributeSelector
      | (AttributeSelector extends `[${infer Attribute}]`
          ? `[${Attribute}=${string}]`
          : never)

    pseudoClass:
      | Exclude<PseudoClass, ParameterizedPseudoClass>
      | `${ParameterizedPseudoClass}(`
      | `${ParameterizedPseudoClass}${string})`

    pseudoElement:
      | Exclude<PseudoElement, ParameterizedPseudoElement>
      | `${ParameterizedPseudoElement}(`
      | `${ParameterizedPseudoElement}${string})`
      // ::cue can be used both with and without parameter
      | '::cue'

    atRule: AtRule | `${AtRule} ${string}`
  }
}

type PseudoClass = Exclude<CSSPseudos, PseudoElement>

type PseudoElement =
  | Extract<CSSPseudos, `::${string}`>
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

import type { AtRules as AtRule } from 'csstype'
import type { HtmlAttributes as AttributeSelector } from 'csstype'
import type { Properties as CommonCSSProperties } from 'csstype'
import type { StyleXVar as CompiledCSSVar } from '@stylexjs/stylex'
import type { Pseudos as CSSPseudos } from 'csstype'
//
